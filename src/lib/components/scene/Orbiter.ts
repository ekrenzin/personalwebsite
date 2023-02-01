import { Vector3, Object3D } from 'three';
interface OrbiterOptions {
  radius: number;
  target: Vector3;
  speed: number;
}
export class Orbiter extends Object3D {
  target: Vector3;
  radius: number;
  speed: number;

  constructor(options: OrbiterOptions) {
    super();
    this.radius = options.radius;
    this.target = options.target;
    this.speed = options.speed;
    this.position.set(this.radius, 0, 0);
  }

  public update(): void {
    if (!this.target) return;
    //random sign 
    this.position.x = this.target.x + this.radius * Math.tan(Date.now() * this.speed) + Math.random() * this.speed * 4;
    this.position.z = this.target.z ;
    this.position.y = this.target.y + this.radius * Math.cos(Date.now() * this.speed) ;

    //rotate all the children x and y
    this.children.forEach((child) => {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    }
    );
  }

  public setTarget(target: Vector3): void {
    this.target = target;
  }
}

export default Orbiter;