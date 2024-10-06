"use client"
import Image from 'next/image';
import React, { useState } from 'react'

export default function Show({ singleProduct }) {

    const user = process.env.NEXT_PUBLIC_SECRET_UNAME;
    const pass = process.env.NEXT_PUBLIC_SECRET_UPASS;
   
    const [downloadDisabled, setDownloadDisabled] = useState(true);
    const [updateMeme, setUpdateMeme] = useState("")
    const [boxText, setBoxText] = useState({});


    const handleText = (e) => {
     
        const { name, value } = e.target;
        setBoxText(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleGenerateMeme = async () => {

        const filledBoxes = Object.values(boxText).filter(text => text.trim() !== '');
        if (filledBoxes.length !== singleProduct.box_count) {
            alert('Please fill all input boxes.');
            return;
        }


        const postAPI = `https://api.imgflip.com/caption_image?template_id=${singleProduct.id}&username=AbidKhan4&password=imgFlip786@&boxes[0][text]=${boxText.text_0 == undefined ? "" : boxText.text_0}&boxes[1][text]=${boxText.text_1 == undefined ? "" : boxText.text_1}&boxes[2][text]=${boxText.text_2 == undefined ? "" : boxText.text_2}&boxes[3][text]=${boxText.text_3 == undefined ? "" : boxText.text_3}`

        const res = await fetch(postAPI)
        const result = await res.json()
       
        setUpdateMeme(result.data.url)
        setBoxText("")
        setDownloadDisabled(false);


      
    };

    const handleDownloadMeme = async () => {
        if (updateMeme) {
            try {
              
                const response = await fetch(updateMeme);
                const blob = await response.blob();

          
                const url = window.URL.createObjectURL(blob);

              
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'meme.jpg');

               
                document.body.appendChild(link);
                link.click();

               
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);

                setDownloadDisabled(true);
            } catch (error) {
                alert('Error downloading meme:', error);
                setDownloadDisabled(true);
            }
        }
    };

    const reset = () => {
        setUpdateMeme("")
    }

    return (
        <>
            <div>
                <h1 className='text-center my-11 text-4xl'>Edit</h1>

                <section class="text-gray-600 body-font">
                    <div class="container  mx-auto">
                        <div class="flex flex-wrap text-center lg:w-2/3 m-auto ">

                            <div class="m-auto lg:w-1/2 bg-current sm:w-1/2 mb-10 px-4 ">
                                <div class=" h-80 overflow-hidden ">
                                    <Image alt="content" class=" object-contain  object-center h-full w-full" src={updateMeme ? updateMeme : singleProduct.url} width={180}
                                        height={37} />
                                   
                                </div>
                            </div>

                            <div class="lg:w-1/2 bg-slate-200 sm:w-1/2 m-auto px-4 ">
                                <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">{singleProduct.name}</h2>

                                {[...Array(singleProduct.box_count)].map((data, index) => <input //similarly yhn hamen input box ki lenght malum thi is liye utne input return by map
                                    required
                                    key={index}
                                    type="text"
                                    name={`text_${index}`}
                                    placeholder={`Enter Text Box ${index + 1}`}
                                    className='p-2 rounded'
                                    value={boxText[`text_${index}`] || ''}//boxText k state k object me jao or whn text_0,1,2,3 ko clear krne k liye
                                    onChange={handleText}
                                    style={{ display: "block", margin: "auto", marginBottom: "10px" }}
                                />
                                )}
                                <button
                                    className="flex mx-auto my-8  text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
                                    onClick={handleGenerateMeme}
                                >
                                    Generate Meme
                                </button>

                                {updateMeme &&
                                    <div className='flex justify-center align-center my-8'>
                                        <button type="button" class="w-1/2 flex justify-center py-3 items-center text-white bg-blue-300 rounded focus:outline-none rounded"
                                            disabled={downloadDisabled}
                                            onClick={handleDownloadMeme}
                                            style={{ backgroundColor: downloadDisabled ? "pink" : "blue" }}
                                        >Download
                                        </button>
                                        <button
                                            type="button"
                                            onClick={reset}
                                            className="w-1/2 flex justify-center py-3 items-center text-white bg-red-700 rounded focus:outline-none rounded mx-4"
                                        >
                                            Reset
                                        </button>
                                    </div>

                                }


                            </div>

                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}
