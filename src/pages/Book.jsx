import axios from 'axios';
import { useState, useEffect } from "react";
import booksService from "../services/books.service";
import { useParams, useNavigate, Link } from "react-router-dom";

// .then(response => {
//      toast.success("The book has been created successfully!"); })
// .catch(error => {
//      toast.error("An error occurred while creating the book:")
// });


function CreateBook() {
    const { bookId } = useParams();
    const isViewMode = bookId ? true : false;
    // Automatically navigate to other route
    const navigate = useNavigate();

    // Initial state
    const initialState = {
        title: "Book title",
        subtitle: "Subtitle",
        genre: "",
        description: ""
    };

    const [formData, setFormData] = useState(initialState);

        useEffect(() => {
            if (bookId) {
                booksService.getBook(bookId)
                .then(response => {
                    setFormData(response.data);
                }).catch(error => {
                    console.error("Error fetching book:", error);
                });
            }
        }, [bookId]);

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
        // formData.append('upload_preset', 'OUR_PRESET');

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

    // New book form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        booksService.createBook(formData)
            .then(response => {
                navigate(`/books/${response.data._id}`);
                setFormData(response.data);
            })
            .catch(error => {
                console.error("Error creating book:", error);
            });
    };

    // Form cancel
    const handleCancel = () => {
        navigate(`/books/`);
    };

    // Redirection to other page to create new Chapter
    const handleCreateChapter = () => {
        navigate(`/books/${bookId}/chapters/create`);
    };

    return (
        <div>
            {/* Background image section */}
            <div style= {{backgroundImage: `url(${formData.imageUrl})`, backgroundColor: 'lightgray', height: '120px'}} className="image-container" >
                {isViewMode ? (
                    <>
                        <div>
                            <Link to="/">Books</Link> → My book
                        </div>
                        <h2>{formData.title}</h2>
                        <h3>{formData.subtitle}</h3>        
                    </>
                ) : (
                    <>  
                        <div>
                            <Link to="/books">Books</Link> → My book
                        </div>
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
        isViewMode ? (
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
            /><br /><br />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
            /><br /><br />
            <div>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit" style={{ backgroundColor: 'green'}}>Create</button>
            </div>
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