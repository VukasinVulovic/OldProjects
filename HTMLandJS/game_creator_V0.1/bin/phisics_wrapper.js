let Engine = Matter.Engine,
World = Matter.World,
Body = Matter.Body,
Bodies = Matter.Bodies;
let engine;

function runEngine() {
  let thickness = 100;
  let barrier = {
    top: { element: '', width: window.innerWidth, height: thickness*2, x: window.innerWidth/2, y: -thickness},
    bottom: { element: '', width: window.innerWidth, height: thickness*2, x: window.innerWidth/2, y: window.innerHeight+thickness},
    left: { element: '', width: thickness*2, height: window.innerWidth, x: -thickness, y: window.innerHeight/2 },
    right: { element: '', width: thickness*2, height: window.innerWidth, x: window.innerWidth+thickness, y: window.innerHeight/2 }
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



