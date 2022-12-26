import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '90vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])


  return (
    <div className="App"> 
    <h1 className='heading' >Art Gallery</h1> 
    
      <div className='buttons' >
        <button className='clear' onClick={() => dispatch(clearData())}>Clear</button>
        <button className='next' onClick={() => dispatch(incrementId())}>Next</button>
        <button className='back' onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input className='inputnum' value={ data.objectId } onChange={(e) => {
        dispatch(inputId(Number(e.target.value)))
      }} />
      <div>
        <div style={{padding: 10}} >{data.objectId}</div>
        {renderImg()}
      </div>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({ objectId: state.data.objectId })

export default connect(mapStateToProps)(App);