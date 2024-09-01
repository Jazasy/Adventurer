import "./AdventureCard.css"

export default function AdventureCard({adventure}){
    return (
        <div className="adventure-card">
            <img src={adventure.images[0]} alt="" />
            <h3>{adventure.title}</h3>
        </div>
    )
}