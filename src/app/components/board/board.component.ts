import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeType } from 'src/app/models/node-type';
import { Node } from '../../models/node';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() nodeType: string;
  @Input() nodes: Node[][];
  @Input() nodesToVisit: Node[];

  @Input() start: Node;
  @Input() destination: Node;
  @Output() startChange = new EventEmitter<Node>();
  @Output() destinationChange = new EventEmitter<Node>();

  isMouseDown = false;
  nodeTypes = NodeType;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseDown(event, node: Node): void {
    event.preventDefault();
    this.isMouseDown = true;
    this.changeNodeType(node);
  }

  onMouseUp(): void {
    this.isMouseDown = false;
  }

  onMouseEnter(node: Node): void {
    if (this.isMouseDown) {
      this.changeNodeType(node);
    }
  }

  private changeNodeType(node: Node): void {
    if (node.type !== NodeType.Wall && node !== this.start && node !== this.destination) {
      switch (this.nodeType) {
        case 'departure':
          this.changeStart(node);
          break;
        case 'arrival':
          this.changeDestination(node);
          break;
        case 'wall':
          node.links.forEach(link => link.links.splice(link.links.indexOf(node), 1));
          node.links = [];
          node.type = NodeType.Wall;
          break;
        case 'fast':
          node.type = NodeType.Fast;
          break;
        case 'slow':
          node.type = NodeType.Slow;
          break;
      }
    }
  }


  private changeStart(start: Node): void {
    this.start = start;
    this.startChange.emit(start);
  }

  private changeDestination(destination: Node): void {
    this.destination = destination;
    this.destinationChange.emit(destination);
  }

}
