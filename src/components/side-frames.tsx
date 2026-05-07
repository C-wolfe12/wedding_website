import Image from "next/image";

import styles from "@/app/page.module.css";

const framedImages = [
  { src: "/IMG_5813.jpg", side: "left", top: "2%", tilt: "-7deg", width: 200, height: 266 },
  { src: "/LEM00005.jpg", side: "right", top: "6%", tilt: "6deg", width: 218, height: 290 },
  { src: "/LEM00009.jpg", side: "left", top: "12%", tilt: "5deg", width: 196, height: 260 },
  { src: "/LEM00010.jpg", side: "right", top: "16%", tilt: "-8deg", width: 210, height: 278 },
  { src: "/LEM00014.jpg", side: "left", top: "22%", tilt: "-4deg", width: 206, height: 274 },
  { src: "/LEM00022.jpg", side: "right", top: "26%", tilt: "7deg", width: 220, height: 292 },
  { src: "/LEM00026.jpg", side: "left", top: "32%", tilt: "6deg", width: 194, height: 258 },
  { src: "/LEM00027.jpg", side: "right", top: "36%", tilt: "-5deg", width: 212, height: 282 },
  { src: "/LEM00037.jpg", side: "left", top: "42%", tilt: "-7deg", width: 208, height: 276 },
  { src: "/LEM00041.jpg", side: "right", top: "46%", tilt: "5deg", width: 216, height: 286 },
  { src: "/LEM00054.jpg", side: "left", top: "52%", tilt: "4deg", width: 200, height: 266 },
  { src: "/LEM00063.jpg", side: "right", top: "56%", tilt: "-6deg", width: 222, height: 294 },
  { src: "/LEM00064.jpg", side: "left", top: "62%", tilt: "-5deg", width: 204, height: 270 },
  { src: "/LEM00068.jpg", side: "right", top: "65%", tilt: "8deg", width: 210, height: 280 },
  { src: "/LEM00077.jpg", side: "left", top: "70%", tilt: "6deg", width: 198, height: 264 },
  { src: "/LEM00081.jpg", side: "right", top: "74%", tilt: "-4deg", width: 214, height: 284 },
  { src: "/LEM00090.jpg", side: "left", top: "78%", tilt: "-7deg", width: 206, height: 274 },
  { src: "/LEM00095.jpg", side: "right", top: "82%", tilt: "5deg", width: 218, height: 290 },
  { src: "/LEM00101.jpg", side: "left", top: "86%", tilt: "4deg", width: 200, height: 266 },
  { src: "/LEM00104.jpg", side: "right", top: "89%", tilt: "-6deg", width: 212, height: 282 },
  { src: "/LEM00126.jpg", side: "left", top: "93%", tilt: "-5deg", width: 196, height: 260 },
  { src: "/LEM00136.jpg", side: "right", top: "96%", tilt: "7deg", width: 208, height: 276 },
] as const;

export default function SideFrames() {
  return (
    <div className={styles.sideFrames} aria-hidden="true">
      {framedImages.map((image, index) => (
        <figure
          key={`${image.src}-${image.top}-${image.side}`}
          className={`${styles.sideFrame} ${
            image.side === "left" ? styles.sideFrameLeft : styles.sideFrameRight
          }`}
          style={
            {
              "--frame-top": image.top,
              "--frame-tilt": image.tilt,
              "--frame-delay": `${index * 0.08}s`,
              "--frame-width": `${image.width}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.sideFrameInner}>
            <Image
              src={image.src}
              alt=""
              width={image.width * 2}
              height={image.height * 2}
              quality={100}
              sizes={`${image.width}px`}
              className={styles.sideFrameImage}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}