 <div className="flex justify-start items-start">
            <img
              className="w-44 h-60 object-cover rounded-sm shadow-lg ml-2"
              src={novel.image}
              alt={novel.title}
            />
            <div className="">
              {/* Title, Story, Author */}
              <h1 className="text-2xl font-bold mr-1 mb-3">{novel.title}</h1>
              <p className="text-sm mr-1 mt-1">
                <span className="font-bold text-white"> القصة : </span>
                <span className="whitespace-pre-line">{novel.story}</span>
              </p>
              <p dir="rtl" className="text-sm mr-1 mt-1">
                <span className="font-bold text-white"> المؤلف : </span>
                <span className="">{novel.publisher.username}</span>
              </p>
              {/* Published at */}

              <p className="text-sm text-white">
                <span className="font-bold">الإصدار : </span>
                <span className="">
                  {
                    // novel.createdAt.split("T")[1].split(".")[0]
                    // + " " +
                    novel.createdAt.split("T")[0]
                  }
                </span>
              </p>

              {/* Genres */}
              <div className="mt-1">
                <span className="font-bold text-sm"> التصنيفات : </span>
                <div className="flex flex-wrap my-1">
                  {novel.genres.length &&
                    novel.genres.map((genre) => (
                      <LinkButton
                        key={genre.slug}
                        href={`/novels/genre/${genre.slug}`}
                      >
                        {genre?.name}
                      </LinkButton>
                    ))}
                  {(() => {
                    let elments = [];
                    for (let i = 1; i < 11; i++)
                      elments.push(
                        <LinkButton key={i} href={`/novels/genre/`}>
                          اكشن {i}
                        </LinkButton>
                      );
                    return elments;
                  })()}
                </div>
              </div>
              {/*  */}
            </div>
          </div>