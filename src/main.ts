// main.ts
import './style.css'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from 'three'
import Alpine from 'alpinejs'

window.Alpine = Alpine

gsap.registerPlugin(ScrollTrigger);

const qs = (selector:string) => document.querySelector<HTMLDivElement>(selector)
const $app = qs('#app')

let camera:THREE.PerspectiveCamera;


export const createThreeScene = (width = 800, height = 600) => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  const scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
  camera.position.set(0, 0, 1000)

  // 箱を作成
  const geometry = new THREE.BoxGeometry(250, 250, 250)
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
  const box = new THREE.Mesh(geometry, material)
  box.position.z = -5000
  box.rotation.x = 90
  box.rotation.y = 40
  scene.add(box)

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(1, 1, 1)
  scene.add(light)

  const tick = (): void => {
    requestAnimationFrame(tick)

    // box.rotation.x += 0.05
    // box.rotation.y += 0.05

    // 描画
    renderer.render(scene, camera)
  }
  tick()

  return renderer.domElement
}
console.log($app)
const threeCanvas = createThreeScene($app.clientWidth, $app.clientHeight)
$app.appendChild(threeCanvas)


let tween = gsap.to(camera.position, { z: 1 }),
  st = ScrollTrigger.create({
    trigger: "#app",
    start: "top top",
    markers: true,
    end: '+=1000', //アニメーション開始位置から1000px固定する
    pin: true, //トリガー要素を固定する
    animation: tween,
    scrub: 1,
  });