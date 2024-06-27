import Image from "next/image";
import styles from "./CategorySection.module.css";

const CategorySection = async () => {
  const res = await fetch("http://localhost:5000/api/category", {
    next: { revalidate: 30 },
  });
  const { data: categories } = await res.json();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Categories</h1>
      <div className={styles.grid}>
        {categories.slice(0, 6).map((category: any) => (
          <div key={category.id} className={styles.card}>
            <Image
              src={category.icon}
              alt={category.name}
              width={100}
              height={100}
              className={styles.image}
            />
            <h2 className={styles.name}>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
