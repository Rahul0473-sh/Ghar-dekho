import './listPage.scss';
import { listData } from '../../../lib/dummyData';
import Filter from '../../Filter/Filter';
import Card from '../../Card/Card';

function ListPage() {
  const data = listData;
  return (
    <div className='listPage'>

      <div className="listContainer">
        <div className="wraper">
          <Filter />
          {data.map((data) => (
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