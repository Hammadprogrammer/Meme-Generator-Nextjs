import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Dashboard() {
  const res = await fetch("https://api.imgflip.com/get_memes")
  const result = await res.json()

  return (
    <>
      <div>
        <h1 className='text-center my-11 text-4xl'>Dashbaord</h1>

        <section class="text-gray-600 body-font">
          <div class="container  mx-auto">
            <div class="flex flex-wrap text-center ">

              {result.data.memes.map((data) => {
                return <div key={data.id} class="lg:w-1/4 sm:w-1/2 mb-10 px-4 ">
                
                  <div class="rounded-lg h-64 overflow-hidden ">
                    <Image alt="content" class=" object-contain  object-center h-full w-full" src={data.url} width={180}
                      height={37} />
                     </div>
                  <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">{data.name}</h2>
                  <Link href={`/${data.id}`}>
                    <button class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Edit</button>
                  </Link>
                </div>
              })}

            </div>
          </div>

        </section>
      </div>
    </>

  )
}
