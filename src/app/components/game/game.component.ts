import { Component, OnInit } from '@angular/core';
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
  currentDistance = 0;
  iterationId = null;

  nodes: Node[][] = [];
  height = 20;
  width = this.height * 2;

  start: Node;
  destination: Node;

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.initNodes();
  }

  private initNodes(): void {
    this.nodes = this.nodeService.initNodes(this.height, this.width);

    this.start = this.nodes[this.height * 0.2][this.width * 0.2];
    this.destination = this.nodes[this.height * 0.8][this.width * 0.8];
  }

  onClickFindPath(): void {
    const nodesToVisit: Node[] = [this.start];
    this.start.distance = 0;

    this.dijkstraIteration(this.start, this.destination, nodesToVisit, 0);
  }

  private dijkstraIteration(current: Node, destination: Node, nodesToVisit: Node[], previousDistance: number): void {
    this.iterationId = setTimeout(() => {
      const targetDistance = previousDistance + this.simulationSpeed;
      while (current !== null && current.distance <= targetDistance) {
        this.currentDistance = current.distance;
        current.visited = true;
        nodesToVisit.splice(nodesToVisit.indexOf(current), 1);

        for (const node of current.links) {
          let distance = 5;
          if (node.slow) {
            distance = 25;
          } else if (node.fast) {
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

        while (pathNode !== null) {
          path.push(pathNode);
          pathNode = pathNode.previous;
        }

        this.buildPath(path);
      }
    }, 50);
  }

  private buildPath(path: Node[]): void {
    setTimeout(() => {
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
    this.currentDistance = 0;
    clearTimeout(this.iterationId);
    this.initNodes();
  }

}
