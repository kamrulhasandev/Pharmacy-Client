import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductSection.module.css';

const ProductSection = async () => {
  const res = await fetch("http://localhost:5000/api/product", {
    next: { revalidate: 30 },
  });
  const { data: products } = await res.json();
  console.log(products);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Products</h1>
      <div className={styles.grid}>
        {products.slice(0, 6).map((product: any) => (
          <Link href={`/product-details/${product._id}`} key={product.id} className={styles.card}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className={styles.image}
            />
            <div className={styles.details}>
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.price}>BDT: {product.price}</p>
              <p className={styles.category}>Category: {product.categoryDetails.name}</p>
              <p className={styles.stock}>Stock: {product.stock}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
