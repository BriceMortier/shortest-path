export interface Node {
  visited: boolean;
  previous: Node;
  distance: number;
  links: Node[];
  onPath: boolean;
  wall: boolean;
  slow?: boolean;
  fast?: boolean;
}
