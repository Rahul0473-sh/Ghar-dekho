import './list.scss';
import { listData } from '../../lib/dummyData';
import Card from '../Card/Card';

function List() {
  return (
      <div className='list'>
          {listData.map((x) => (
              <Card key={x.id} value={x}/>
          ))}
    </div>
  );
}

export default List;