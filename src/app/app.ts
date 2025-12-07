import { RouterOutlet } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private robot!: THREE.Mesh;
  private frameId: any;

  private waypoints: THREE.Vector3[] = [];
  private currentWaypoint = 0;
  private speed = 0.05;

  ngOnInit() {
    this.initScene();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.frameId);
    this.controls.dispose();
  }

  private initScene() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(40, 60, 80);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(20, 40, 20);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // OrbitControls for dragging/zooming
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Warehouse and robot
    this.createWarehouse();
    this.createRobot();
    this.createWaypoints();

    window.addEventListener('resize', () => this.onResize());
  }

  private createWarehouse() {
    const rackMaterial = new THREE.LineBasicMaterial({ color: 0x4444ff });
    const gridSize = 10;
    const levels = 5;
    const racksPerRow = 8;

    for (let level = 0; level < levels; level++) {
      const y = level * 4; // height difference per floor
      for (let i = 0; i < racksPerRow; i++) {
        for (let j = 0; j < 5; j++) {
          const boxGeom = new THREE.BoxGeometry(2, 3, 2);
          const edges = new THREE.EdgesGeometry(boxGeom);
          const line = new THREE.LineSegments(edges, rackMaterial);
          line.position.set(i * 3 - 10, y + 1.5, j * 3 - 8);
          this.scene.add(line);
        }
      }
    }

    const grid = new THREE.GridHelper(100, 50, 0xaaaaaa, 0xdddddd);
    this.scene.add(grid);
  }

  private createRobot() {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.robot = new THREE.Mesh(geometry, material);
    this.robot.position.set(-10, 1, -8);
    this.scene.add(this.robot);
  }

  private createWaypoints() {
    // Create a looping path across aisles and floors
    const levels = 5;
    const racksPerRow = 8;

    for (let level = 0; level < levels; level++) {
      const y = level * 4 + 1.5;
      for (let i = 0; i < racksPerRow; i++) {
        this.waypoints.push(new THREE.Vector3(i * 3 - 10, y, -8)); // move along one aisle
      }
      this.waypoints.push(new THREE.Vector3((racksPerRow - 1) * 3 - 10, y + 4, -8)); // lift to next floor
    }

    // Return to base floor
    this.waypoints.push(new THREE.Vector3(-10, 1.5, -8));
  }

  private moveRobot() {
    if (this.waypoints.length === 0) return;

    const target = this.waypoints[this.currentWaypoint];
    const direction = new THREE.Vector3().subVectors(target, this.robot.position);
    const distance = direction.length();

    if (distance < 0.1) {
      // Go to next waypoint
      this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
    } else {
      direction.normalize();
      this.robot.position.add(direction.multiplyScalar(this.speed));
    }
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    this.moveRobot();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onResize() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
