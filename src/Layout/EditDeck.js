import Header from "./Header";
import BreadCrumbNav from "../Layout/BreadCrumbNav"
import DeckForm from "../Decks/DeckForm"

function EditDeck(){
    return(
        <>
        <Header />
        
        <div className="container">
            <DeckForm />
        </div>
        </>
    )
}

export default EditDeck;