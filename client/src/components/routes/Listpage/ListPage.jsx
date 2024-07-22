import './listPage.scss';
import { listData } from '../../../lib/dummyData';
import Filter from '../../Filter/Filter';
import Card from '../../Card/Card';
import { useLoaderData } from 'react-router-dom';

function ListPage() {
  const data = listData;
  const post = useLoaderData();
  console.log(post);
  return (
    <div className='listPage'>

      <div className="listContainer">
        <div className="wraper">
          <Filter />
          {post?.map((data) => (
            <Card value={data}/>
          ))}
        </div>
      </div>
      <div className="mapContainer">
      </div>
    </div>
  );
}

export default ListPage;