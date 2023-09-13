import CardForm from "../Cards/CardForm";
import Header from "./Header";
import BreadCrumbNav from "./BreadCrumbNav";

function CreateCard(){
    return(
        <>
        <Header />
        <div className="container">
            <BreadCrumbNav />
            <h1>Create Card</h1>
            <CardForm />
        </div>
        </>
    )
}

export default CreateCard;