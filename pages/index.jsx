import { useState } from 'react';
import ProductItem from '../components/product/ProductItem';
import { MainLayout } from '../layouts/MainLayout';
import { getData } from '../utils/fetchData';
import styles from './Home.module.scss';

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <MainLayout>
      <div className="container">
        <div className={styles.products}>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const res = await getData('product');
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default Home;
