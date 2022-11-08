# Rewayat Arabia Site (soon).

      <Container>
        <div className="mt-24 w-full flex justify-between flex-col">
          <div className="">
            <div className="flex justify-start items-center flex-col md:justify-start md:items-start md:flex-row">
              <div className="block md:hidden md:mt-0 md:mr-4">
                <h1 className="text-2xl font-bold my-3 text-center md:mt-0 md:text-justify">
                  {novel.title}
                </h1>
                <table className="">
                  <tbody>
                    {/* Story */}
                    <tr className="align-top text-right">
                      <th className="pl-4 py-2 whitespace-nowrap">القصة :</th>
                      <td className="py-2 whitespace-pre-line font-semibold">
                        {storyHidden && novel.story.length > 200
                          ? novel.story.slice(0, 200) + "..."
                          : novel.story}

                        {novel.story.length > 200 && (
                          <span
                            className="btn btn-purple m-1 py-0 px-2 cursor-pointer whitespace-nowrap"
                            onClick={toggleStoryHidden}
                          >
                            {storyHidden ? "read more" : "read less"}
                          </span>
                        )}
                      </td>
                    </tr>
                    {/* Author */}
                    <tr className="align-top text-right">
                      <th className="pl-4 py-2 whitespace-nowrap">المؤلف :</th>
                      <td className="py-2 font-semibold">
                        {novel.publisher.username}
                      </td>
                    </tr>
                    {/* Publish Date */}
                    <tr className="align-top text-right">
                      <th className="pl-4 py-2 whitespace-nowrap">
                        تاريخ النشر :
                      </th>
                      <td className="py-2 font-semibold">
                        {novel.createdAt.split("T")[0]}
                      </td>
                    </tr>
                    {/* Views */}
                    <tr className="align-top text-right">
                      <th className="pl-4 py-2 whitespace-nowrap">
                        المشاهدات :
                      </th>
                      <td className="py-2 font-semibold">{novel.views}</td>
                    </tr>
                    {/* Genres */}
                    <tr className="align-top text-right">
                      <th className="pl-4 py-2 whitespace-nowrap">
                        التصنيفات :
                      </th>
                      <td className="relative py-2 font-semibold">
                        <div className="invisibles flex flex-wrap gap-1.5">
                          {novel.genres.length &&
                            novel.genres.map((genre) => (
                              <LinkButton
                                key={genre.slug}
                                href={`/novels/genre/${genre.slug}`}
                              >
                                {genre.name}
                              </LinkButton>
                            ))}
                        </div>
                      </td>
                    </tr>
                    {/*  */}
                  </tbody>
                </table>
              </div>
              {/*  */}
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="">
            {novel.chapters.length > 0 ? (
              <div className=""></div>
            ) : (
              <div className="w-full">
                <h4 className="text-3xl text-center">No chapters (-_-)!</h4>
              </div>
            )}
          </div>
          {/* <LinkButton href={""}></LinkButton> */}
        </div>
      </Container>
