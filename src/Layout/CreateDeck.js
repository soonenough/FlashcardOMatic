import Header from "./Header";
import BreadCrumbNav from "./BreadCrumbNav";
import DeckForm from "../Decks/DeckForm";

function CreateDeck() {
    const breadcrumbPaths = [
        { label: 'Home', path: '/' },
        { label: 'Create Deck' },
    ];

    return (
        <>
            <Header />
            <div className="container">
                <DeckForm />
            </div>
        </>
    );
}


export default CreateDeck;