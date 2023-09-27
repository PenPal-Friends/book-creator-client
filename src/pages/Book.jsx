import axios from 'axios';
import { useState, useEffect } from "react";
import booksService from "../services/books.service";
import chaptersService from "../services/chapters.service";
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

    // If bookId value changes, this updates its formData
    useEffect(() => {
        if (bookId) {
            booksService.getBook(bookId)
                .then(response => {
                    setFormData(response.data);
                }).catch(error => {
                    console.error("Error fetching book:", error);
                });

            // Fetch chapters for the book
            chaptersService.getChapters(bookId)
            .then(response => {
                setChapters(response.data);
            }).catch(error => {
                console.error("Error fetching chapters:", error);
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

    // + Add Chapter: Redirect to /chapters/create
    const handleAddChapter = () => {
        navigate(`/books/${bookId}/chapters/create`);
    };

    // Display chapters
    const [chapters, setChapters] = useState ([]);


    return (
        <div>
            {/* Background image section */}
            <div style={{ backgroundImage: `url(${formData.imageUrl})`, backgroundColor: 'lightgray', height: '120px' }} className="image-container" >
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
                        /><br />
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            placeholder="Subtitle"
                        /><br />
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
                        <p>{formData.description}</p><br />
                        <h4>Chapters</h4><br />
                        <button type="button" onClick={handleAddChapter}>+ Add</button>
                        <div style={{ backgroundColor: 'lightgray', width: '100%' }}>
                            {chapters.map((chapter) => (
                                <div className="chapterCard" key={chapter._id} style={{ backgroundColor: 'white', margin: '12px', padding: '12px' }}>
                                    <Link to={`/books/${bookId}/chapters/${chapter._id}`}>
                                        <h3>{chapter.title}</h3>
                                        <p>{chapter.text}</p>
                                    </Link>
                                </div>
                            ))}
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
                            <button type="submit" style={{ backgroundColor: 'green' }}>Create</button>
                        </div>
                    </form >
                )}
        </div >
    );
}


export default CreateBook;