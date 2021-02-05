import G6, { IGroup, EdgeConfig } from "@antv/g6";

function afterDraw(): (cfg?: EdgeConfig, group?: IGroup) => void {
  return (cfg, group): void => {
    // get the first shape in the graphics group of this edge, it is the path of the edge here
    const mainShape = group.get("children")[0];

    // get the coordinate of the quatile on the path
    const quatile = mainShape.getPoint(0.25);

    group.addShape("marker", {
      attrs: {
        x: quatile.x,
        y: quatile.y,
        r: 5,
        symbol: "square",
        fill: "orange"
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: "marker-shape"
    });
  };
}

const data = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 200
    },
    {
      id: "node2",
      x: 300,
      y: 300
    }
  ],
  edges: [
    {
      id: "edge1",
      type: "flow",
      target: "node2",
      source: "node1",
      controlPoints: [{ x: 300, y: 200 }]
    }
  ]
};
const graph = new G6.Graph({
  container: "root",
  width: 500,
  height: 500,
  renderer: "svg",
  modes: {
    default: [
      "drag-node",
      // 'drag-node-with-group',
      {
        type: "drag-canvas",
        enableOptimize: true // enable the optimize to hide the shapes beside nodes' keyShape
      },
      {
        type: "zoom-canvas",
        enableOptimize: true // enable the optimize to hide the shapes beside nodes' keyShape
      }
    ]
  }
});
G6.registerEdge(
  "flow",
  {
    options: {
      style: {
        stroke: "#ccc",
        endArrow: { fill: "blue", path: G6.Arrow.triangle(10, 20, 25), d: 25 }
      }
    },
    afterDraw: afterDraw(),
    update: undefined
  },
  "polyline"
);
graph.read(data);
