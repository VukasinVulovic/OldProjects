let Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;
let engine;

function runEngine() {

  let thickness = 10;

  let barrier = {
    top: { element: '', width: width, height: thickness*2, x: width/2, y: -thickness},
    bottom: { element: '', width: width, height: thickness*2, x: width/2, y: height+thickness},
    left: { element: '', width: thickness*2, height: width, x: -thickness, y: height/2 },
    right: { element: '', width: thickness*2, height: width, x: width+thickness, y: height/2 }
  };

  engine = Engine.create();

  barrier.top.element = Bodies.rectangle(barrier.top.x, barrier.top.y, barrier.top.width, barrier.top.height, { isStatic: true });
  World.add(engine.world, barrier.top.element);

  barrier.bottom.element = Bodies.rectangle(barrier.bottom.x, barrier.bottom.y, barrier.bottom.width, barrier.bottom.height, { isStatic: true });
  World.add(engine.world, barrier.bottom.element);

  barrier.left.element = Bodies.rectangle(barrier.left.x, barrier.left.y, barrier.left.width, barrier.left.height, { isStatic: true });
  World.add(engine.world, barrier.left.element);

  barrier.right.element = Bodies.rectangle(barrier.right.x, barrier.right.y, barrier.right.width, barrier.right.height, { isStatic: true });
  World.add(engine.world, barrier.right.element);

  Engine.run(engine);
}
