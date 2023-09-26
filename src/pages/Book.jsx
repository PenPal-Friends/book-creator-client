import axios from 'axios';
import { useState } from "react";
import booksService from "../services/books.service";
import { useParams, useNavigate, Link } from "react-router-dom";


function CreateBook() {

    const [formData, setFormData] = useState({
        title: "Book title",
        subtitle: "Subtitle",
        genre: "",
        description: ""
    });

    const [isSaved, setIsSaved] = useState(false);

    // Automatically navigate to other route
    const navigate = useNavigate();

    // Form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Cloudinary image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        // Upload preset: Lets us customize image settings in C.
        formData.append('upload_preset', 'OUR_PRESET');

        axios.post('https://api.cloudinary.com/v1_1/OUR_CL_CLOUD_NAME/image/upload', formData)
            .then(response => {
                const imageUrl = response.data.secure_url;
                setFormData(prevState => ({
                    ...prevState,
                    imageUrl: imageUrl
                }));
            })
            .catch(error => {
                console.error("Error uploading image", error);
            });
    }

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        booksService.createBook(formData)
            .then(response => {
                navigate(`/books/${response.data._id}`);
                setIsSaved(true);
            })
            .catch(error => {
                console.error("Error creating book:", error);
            });
    };

    // Form cancel
    const handleCancel = () => {
        navigate("/books");
    };

    // Create new Chapter
    const handleCreateChapter = () => {
        navigate("/chapters/create");
    };


    return (
        <div>
            {/* Background image section */}
            <div style= {{backgroundImage: `url(${formData.imageUrl})`, backgroundColor: 'lightgray', height: '120px'}} className="image-container" >
                {isSaved ? (
                    <>
                        <div>
                            <Link to="/">Home</Link> → My book
                        </div>
                        <h2>{formData.title}</h2>
                        <h3>{formData.subtitle}</h3>        
                    </>
                ) : (
                    <>  
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Book title"
                        /><br/>
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            placeholder="Subtitle"
                        /><br/>
                        {/* Cloudinary image upload */}
                        <input
                            type="file"
                            name="image upload"
                            onChange={handleImageUpload}
                        />
                    </>
                )}
            </div>
        
        {
        //Rest of the fields
        isSaved ? (
            <>
            <p>{formData.genre}</p>
            <p>{formData.description}</p><br/>
            <h4>Chapters</h4><br/>
            <button type="button" onClick={handleCreateChapter}>+ Add</button>
            <div style={{ backgroundColor: 'lightgray', width: '100%' }}>
                <div style={{ backgroundColor: 'gray', width: '120px', height: '120px' }}></div>
            </div>
            </>
        ) : (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                /><br/><br/>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                /><br/><br/>
                <button type="submit">Create book</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form >
        )}
    </div >
    );
}


export default CreateBook;



// Position cards
// Backend property: chapterNumber
//
// Backend: see above
//
// Frontend:
// C1) If chapterNumber = 1, disable arrow up
// C2) If chapterNumber = max length of chapters array, disable arrow down