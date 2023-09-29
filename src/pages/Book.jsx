import axios from 'axios';
import { useState, useEffect } from "react";
import booksService from "../services/books.service";
import chaptersService from "../services/chapters.service";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


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
    // Display chapters
    const [chapters, setChapters] = useState([]);

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


    // // Cloudinary image upload
    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     // Upload preset: Lets us customize image settings in C.
    //     // formData.append('upload_preset', 'OUR_PRESET');

    //     axios.post('https://api.cloudinary.com/v1_1/OUR_CL_CLOUD_NAME/image/upload', formData)
    //         .then(response => {
    //             const imageUrl = response.data.secure_url;
    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 imageUrl: imageUrl
    //             }));
    //         })
    //         .catch(error => {
    //             console.error("Error uploading image", error);
    //         });
    // }


    // New book form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        booksService.createBook(formData)
            .then(response => {
                navigate(`/books/${response.data._id}`);
                setFormData(response.data);
                toast.success("The book has been created successfully!");
            })
            .catch(error => {
                console.error("Error creating book:", error);
                toast.error("An error occurred while creating the book.");
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


    // Move chapter up
    const handleMoveChapterUp = (event, chapterId) => {
        // Stop event propagation (stacking of events because of move button on card)
        event.preventDefault();
        event.stopPropagation();

        chaptersService.moveChapterUp(bookId, chapterId)
            .then(() => {
                // Refresh chapters after moving
                chaptersService.getChapters(bookId)
                    .then(response => {
                        setChapters(response.data);
                    });
            })
            .catch(error => {
                console.error("Error moving the chapter.")
                toast.error("An error occurred while moving the chapter.");
            });
    };


    // Move chapter down
    const handleMoveChapterDown = (event, chapterId) => {
        // Stop event propagation (stacking of events because of move button on card)
        event.preventDefault();
        event.stopPropagation();

        chaptersService.moveChapterDown(bookId, chapterId)
            .then(() => {
                // Refresh chapters after moving
                chaptersService.getChapters(bookId)
                    .then(response => {
                        setChapters(response.data);
                    });
            })
            .catch(error => {
                console.error("Error moving the chapter.")
                toast.error("An error occurred while moving the chapter.");
            });
    };


    return (
        <div className="bg-gray-200 min-h-screen">
            {/* Title section (with image) */}
            <div className="bg-cover bg-center relative image-container text-left">
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="relative z-10 px-12 py-12 text-white">

                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-4 mb-2">
                        <Link to="/books" className="text-white hover:underline">
                            Books
                        </Link>
                        <span className="mx-2">›</span><span className="mx-2"></span>
                        {isViewMode ? formData.title : "My book"}
                    </div><br /><br />

                    {isViewMode ? (
                        <>
                            <h1 className="text-3xl font-bold pt-5">{formData.title}</h1>
                            <h2 className="text-xl pt-5">{formData.subtitle}</h2>
                        </>
                    ) : (
                        <>
                            {/* Header input fields */}
                            <input
                                className="text-3xl font-bold bg-transparent py-1 mt-2"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Book title"
                            /><br />
                            <input
                                className="text-xl bg-transparent py-1 mt-2"
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="Subtitle"
                            /><br />

                            {/* Cloudinary image upload
                            <input
                                className="bg-transparent border-b border-white py-1 px-2 mt-2"
                                type="file"
                                name="image upload"
                                onChange={handleImageUpload}
                            /> */}
                        </>
                    )}
                </div>
            </div>

            {
                //Rest of the fields
                isViewMode ? (
                    <>
                        <p className="text-gray-700">{formData.genre}</p>
                        <p className="text-gray-600 mb-4">{formData.description}</p><br />

                            <h3 className="text-2xl font-bold mb-2">Chapters</h3><br />
                            <button
                                className="bg-[#24978F] text-white font-semibold text-base uppercase py-3 px-5 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F"
                                type="button" onClick={handleAddChapter}>
                                + Add
                            </button>

                            {/* Chapter card section */}
                            <div className="flex justify-center mt-4">
                                <div className="mt-4 lg:w-2/3 md:w-3/4 sm:w-full">
                                <div className="bg-gray-300 px-2 py-2 space-y-2">
                                    {/* Chapter cards */}
                                    {chapters.map((chapter, index) => (

                                        <Link to={`/books/${bookId}/chapters/${chapter._id}`} className="block">
                                            <div className="bg-white flex flex-col md:flex-row items-start p-10 rounded shadow space-x-0 md:space-x-10 justify-between" key={chapter._id}>

                                                <div className="flex flex-col md:flex-row items-start w-full md:w-auto space-x-auto md:space-x-10">
                                                    <div className="w-3 flex items-start">
                                                        <p className="text-gray-600">{chapter.chapterNumber}</p>
                                                    </div>

                                                    <div style={{ width: '228px' }} className="flex-shrink-0">
                                                        <h3 className="text-xl font-bold text-left">{chapter.title}</h3>
                                                    </div>

                                                    <div className="flex flex-grow items-start">
                                                        <p className="text-gray-600 overflow-hidden line-clamp-4 text-left">{chapter.text}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col space-y-2 w-auto mt-4 md:mt-0">
                                                    <button
                                                        className={`bg-gray-300 w-12 h-12 px-2 py-1 rounded ${index === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-2 border-gray-400 text-gray-600'}`}
                                                        type="button"
                                                        onClick={(event) => handleMoveChapterUp(event, chapter._id)}
                                                        // Disable the button & fitting styling
                                                        disabled={index === 0}
                                                    >
                                                        ⌃
                                                    </button>
                                                    <button
                                                        className={`transform rotate-180 bg-gray-300 w-12 h-12 px-2 py-1 rounded ${index === chapters.length - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-2 border-gray-400 text-gray-600'}`}
                                                        type="button"
                                                        onClick={(event) => handleMoveChapterDown(event, chapter._id)}
                                                        // Disable the button & fitting styling
                                                        disabled={index === chapters.length - 1}
                                                    >
                                                        ⌃
                                                    </button>
                                                </div>

                                            </div>
                                        </Link>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Button nav bar */}
                        <div className="flex justify-end bg-white border-b-2 border-gray-300 px-8 py-4 mb-12">
                            <button className="bg-white border-2 border-[#24978F] text-[#333333] font-semibold text-base uppercase py-3 px-5 mr-4 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F" type="button" onClick={handleCancel}>Cancel</button>
                            <button className="bg-[#24978F] text-white font-semibold text-base uppercase py-3 px-5 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F" type="submit" form="bookForm">
                                Create
                            </button>
                        </div>

                        {/* Form: Text & genre */}
                        <div className="flex justify-center w-full">
                            <form id="bookForm" className="bg-white flex flex-col items-start p-10 lg:w-2/3 md:w-3/4 sm:w-full rounded shadow" onSubmit={handleSubmit}>
                                <input
                                    className="border rounded lg:w-1/2 md:w-2/3 sm:w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline"
                                    type="text"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    placeholder="Genre"
                                /><br />
                                <textarea
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline mt-2"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    rows="24"
                                />
                            </form >
                        </div>
                    </>
                )}
        </div>
    );
}


export default CreateBook;