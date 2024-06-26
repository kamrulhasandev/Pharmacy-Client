import Image from "next/image";
import Link from "next/link";
import styles from "./ProductSection.module.css";

const ProductSection = async () => {
  const res = await fetch("https://pharmacy-server.vercel.app/api/product", {
    next: { revalidate: 30 },
  });
  const { data: products } = await res.json();


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Products</h1>
      <div className={styles.grid}>
        {products.slice(0, 6).map((product: any) => (
          <Link
            href={`/product-details/${product._id}`}
            key={product.id}
            className={styles.card}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className={styles.image}
            />
            <div className={styles.details}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className={styles.name}>{product.name}</h2>
                <p style={{ fontWeight: "bold" }} className={styles.price}>
                  BDT: <span style={{ color: "green" }}>{product.price}</span>
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className={styles.category}>
                  Category: {product.categoryDetails.name}
                </p>
                <p className={styles.stock}>Stock: {product.stock}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
