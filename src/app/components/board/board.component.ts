import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../../models/node';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() nodeType: string;
  @Input() nodes: Node[][];

  @Input() start: Node;
  @Input() destination: Node;
  @Output() startChange = new EventEmitter<Node>();
  @Output() destinationChange = new EventEmitter<Node>();

  mouseDown = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseDown(event): void {
    event.preventDefault();
    console.log('mouse down');
    this.mouseDown = true;
  }

  onMouseUp(): void {
    console.log('mouse up');
    this.mouseDown = false;
  }

  onMouseClick(node: Node): void {
    console.log('mouse click');
    if (!node.wall && node !== this.start && node !== this.destination) {
      switch (this.nodeType) {
        case 'departure':
          this.changeStart(node);
          break;
        case 'arrival':
          this.changeDestination(node);
          break;
      }
    }
  }

  onMouseOver(node: Node): void {
    console.log('mouse over');
    if (this.mouseDown && node !== this.start && node !== this.destination && !node.wall) {
      switch (this.nodeType) {
        case 'wall':
          node.links.forEach(link => link.links.splice(link.links.indexOf(node), 1));
          node.links = [];
          node.wall = true;
          node.fast = node.slow = false;
          break;
        case 'fast':
          node.fast = true;
          node.slow = false;
          break;
        case 'slow':
          node.slow = true;
          node.fast = false;
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
