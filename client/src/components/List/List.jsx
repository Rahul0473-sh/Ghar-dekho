import './list.scss';
import { listData } from '../../lib/dummyData';
import Card from '../Card/Card';

function List({posts}) {
  return (
      <div className='list'>
          {posts.map((x) => (
              <Card key={x.id} value={x}/>
          ))}
    </div>
  );
}

export default List;