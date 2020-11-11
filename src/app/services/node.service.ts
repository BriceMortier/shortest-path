import { Injectable } from '@angular/core';
import { Node } from '../models/node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor() { }

  public initNodes(height: number, width: number): Node[][] {
    const nodes = [];

    // Create all mesh nodes
    for (let i = 0; i < height; i++) {
      const row: Node[] = [];
      for (let j = 0; j < width; j++) {
        const node: Node = { visited: false, previous: null, distance: Number.MAX_SAFE_INTEGER, links: [], onPath: false, wall: false };
        row.push(node);
      }
      nodes.push(row);
    }

    // Link nodes to their neighbors
    nodes.forEach((nodesRow, y) => {
      nodesRow.forEach((node, x) => {
        const leftIndex = x - 1;
        const rightIndex = x + 1;
        const topIndex = y - 1;
        const bottomIndex = y + 1;

        for (const neighborIndex of [leftIndex, rightIndex]) {
          if (neighborIndex >= 0 && neighborIndex < width) {
            node.links.push(nodes[y][neighborIndex]);
          }
        }
        for (const neighborIndex of [topIndex, bottomIndex]) {
          if (neighborIndex >= 0 && neighborIndex < height) {
            node.links.push(nodes[neighborIndex][x]);
          }
        }
      });
    });

    return nodes;
  }

}
