import { Avatar } from "antd";
import Image from "next/image";

export default function SingleWebTemplate({ product }) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${product.card_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "420px",
          color: "white",
        }}
      >
        <h1>{product.name}</h1>
        <p>{product.blurb}</p>
        {/* <Image
        src={product.card_image}
        alt={product.blurb}
        width={604}
        height={420}
        objectFit="cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        style={{ borderRadius: "5px" }}
      /> */}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h2>Detail Images</h2>
        {product.detail_images.map((image) => (
          <Image
            key={image._id}
            src={image.url}
            alt={product.blurb}
            width={604}
            height={420}
            objectFit="cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            style={{ borderRadius: "5px", marginTop: "1rem" }}
          />
        ))}
      </div>
    </div>
  );
}
