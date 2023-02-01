import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';


class GlowingShape extends THREE.Object3D {
    color: string;
    material: THREE.MeshBasicMaterial;
    opacity: number;
    
    constructor(color: string) {
        super()
        this.color = color;
        this.opacity = 1;
        const random = Math.random() * 100;
        this.material = new THREE.MeshBasicMaterial({
            color: this.color,
            transparent: true,
            opacity: Math.random() * 0.0625 + 0.125,
        })
        if (random  < 50) {
            this.createObject(this.material);
        } else {
            this.createShape(this.material);
        }

    }

    createShape(material: THREE.MeshBasicMaterial) {
        const shape = new THREE.Shape();
        const randomPoints = Array(20).fill().map(() => {
          const randomX =( Math.random() * 100 - 50) / 500;
          const randomY = (Math.random() * 100 - 50) / 500;
          return new THREE.Vector2(randomX, randomY);
        });
        shape.setFromPoints(randomPoints);
        
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material)
        mesh.layers.enable(1);
        this.add(mesh);
    }

    createObject(material: THREE.MeshBasicMaterial) {
        const randomVertices = Array(10).fill().map(() => {
            const divisor = 500
            const randomX = (Math.random() * 50) / divisor;
            const randomY = (Math.random() * 50) / divisor;
            const randomZ = (Math.random() * 50 - 25) / divisor;
            return new THREE.Vector3(randomX, randomY, randomZ);
        });
        
        const geometry = new ConvexGeometry(randomVertices);
        const mesh = new THREE.Mesh(geometry, material)
        mesh.layers.enable( 1);
        this.add(mesh);
    }

    public update(): void {
        if (this.parent && this.parent.opacity)  this.material.opacity = this.parent.opacity;
        return
    }
}

export default GlowingShape;