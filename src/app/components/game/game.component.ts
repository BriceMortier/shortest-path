import { Component, OnInit } from '@angular/core';
import { NodeType } from 'src/app/models/node-type';
import { NodeService } from 'src/app/services/node.service';
import { Node } from '../../models/node';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  selectedNodeType = 'wall';
  simulationSpeed = 5;
  iterationId;
  buildPathId;

  nodes: Node[][] = [];
  nodesToVisit: Node[] = [];

  start: Node;
  destination: Node;

  boardSizeSmall = { name: 'S', value: 10 };
  boardSizeMedium = { name: 'M', value: 30 };
  boardSizeLarger = { name: 'L', value: 50 };
  boardSizeOptions = [ this.boardSizeSmall, this.boardSizeMedium, this.boardSizeLarger ];
  selectedBoardSize = this.boardSizeSmall;

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.initNodes();
  }

  private initNodes(): void {
    this.nodes = this.nodeService.initNodes(this.getHeight(), this.getWidth());

    this.start = this.nodes[this.getHeight() * 0.2][this.getWidth() * 0.2];
    this.destination = this.nodes[this.getHeight() * 0.8][this.getWidth() * 0.8];
  }

  private getHeight(): number {
    return this.selectedBoardSize.value;
  }

  private getWidth(): number {
    return this.getHeight() * 2;
  }

  onClickFindPath(): void {
    this.stop();
    this.nodeService.clearNodes(this.nodes);
    this.nodesToVisit = [this.start];
    this.start.distance = 0;

    this.dijkstraIteration(this.start, this.destination, this.nodesToVisit, 0);
  }

  private dijkstraIteration(current: Node, destination: Node, nodesToVisit: Node[], previousDistance: number): void {
    this.iterationId = setTimeout(() => {
      const targetDistance = previousDistance + this.simulationSpeed;
      while (current !== null && current.distance <= targetDistance) {
        current.visited = true;
        nodesToVisit.splice(nodesToVisit.indexOf(current), 1);

        for (const node of current.links) {
          let distance = 5;
          if (node.type === NodeType.Slow) {
            distance = 25;
          } else if (node.type === NodeType.Fast) {
            distance = 1;
          }
          const alt = current.distance + distance;
          if (alt < node.distance) {
            node.distance = alt;
            node.previous = current;
            nodesToVisit.push(node);
          }
        }

        current = this.getMinimumDistanceNode(nodesToVisit, destination);
      }

      if (current !== null) {
        this.dijkstraIteration(current, destination, nodesToVisit, targetDistance);
      } else {
        const path: Node[] = [];
        let pathNode = destination;

        while (pathNode) {
          path.push(pathNode);
          pathNode = pathNode.previous;
        }

        this.buildPath(path);
      }
    }, 50);
  }

  private buildPath(path: Node[]): void {
    this.buildPathId = setTimeout(() => {
      const node = path.pop();
      if (node) {
        node.onPath = true;
        this.buildPath(path);
      }
    }, 20);
  }

  private getMinimumDistanceNode(nodes: Node[], arrival: Node): Node {
    const closestNode = nodes.filter(node => node.distance < arrival.distance).reduce(
      (closest, node) => closest !== null ? (node.distance < closest.distance ? node : closest) : node, null);

    return closestNode;
  }

  onClickReset(): void {
    this.stopAndInit();
  }

  onChangeBoardSize(): void {
    this.stopAndInit();
  }

  private stopAndInit(): void {
    this.stop();
    this.initNodes();
  }

  private stop(): void {
    clearTimeout(this.iterationId);
    clearTimeout(this.buildPathId);
  }

}
