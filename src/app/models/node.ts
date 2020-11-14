import { NodeType } from './node-type';

export interface Node {
  distance: number;
  links: Node[];
  type: NodeType;
  visited?: boolean;
  previous?: Node;
  onPath?: boolean;
}
