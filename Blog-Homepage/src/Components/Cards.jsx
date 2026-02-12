import '../Stylings/Cards.css';

const Cards = ({Data}) => {
  return (
    <div className="card">
      <div className="card-image-container">
        {Data.image && (
          <img 
            src={Data.image} 
            alt={Data.title}
            className="card-image"
          />
        )}
      </div>
      
      <div className="card-content">
        <div className="card-genre">{Data.genre}</div>
        
        <h2 className="card-title">{Data.title}</h2>
        
        <p className="card-description">{Data.description}</p>
        
        <div className="card-footer">
          <span className="card-date">{Data.date}</span>
          <button className="card-read-more">Read More →</button>
        </div>
      </div>
    </div>
  )
}

export default Cards;