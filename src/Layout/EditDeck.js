import Header from "./Header";
import BreadCrumbNav from "../Layout/BreadCrumbNav"
import DeckForm from "../Decks/DeckForm"

function EditDeck(){
    return(
        <>
        <Header />
        
        <div className="container">
        <BreadCrumbNav currentItem={"Edit Deck"} />
            <h1>Edit Deck</h1>
            <DeckForm />
        </div>
        </>
    )
}

export default EditDeck;