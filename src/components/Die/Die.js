import './Die.css';

function Die(props) {
  return (
    <div className="die-face" style={props.isHeld ? {backgroundColor: "#59E391"}: {backgroundColor: "#fff"} } onClick={()=> props.holdDice(props.id)}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;