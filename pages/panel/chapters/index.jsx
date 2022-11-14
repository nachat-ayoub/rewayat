import { requireAuthorAuth } from "../../../utils/middlewares";
import Container from "../../../components/Container";
import useToggler from "../../../hooks/useToggler";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

const UserChaptersPage = (props) => {
	const [chapters, setChapters] = useState(props.chapters ?? []);
	const [isAsc, toggleIsAsc] = useToggler(false);

	// Sort Chapters By Date (Asc | Desc) :
	const sortChaptersByDate = () => {
		toggleIsAsc();
		setChapters(
			[...chapters].sort((a, b) => {
				if (isAsc) {
					return new Date(a.createdAt) - new Date(b.createdAt);
				} else {
					return new Date(b.createdAt) - new Date(a.createdAt);
				}
			})
		);
	};

	return (
		<Container className="px-2">
			<div className="w-full">
				{chapters.length > 0 ? (
					<div className="overflow-x-auto relative shadow-md rounded sm:rounded-lg">
						<table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-700 dark:text-gray-300">
								<tr>
									<th
										onClick={() =>
											setChapters([...chapters].reverse())
										}
										scope="col"
										className="py-3 px-6 cursor-pointer"
									>
										<div className="w-full flex items-center justify-center">
											<span>الفصل</span>
											<span className="inline-block p-2 rotate-90 cursor-pointer">
												<i className="fa-solid fa-right-left" />
											</span>
										</div>
									</th>
									<th
										scope="col"
										className="hidden md:table-cell py-3 px-6"
									>
										عنوان الفصل
									</th>
									<th scope="col" className="py-3 px-6">
										عنوان الرواية
									</th>
									<th
										onClick={sortChaptersByDate}
										scope="col"
										className="py-3 px-6 cursor-pointer"
									>
										تاريخ النشر
										<span className="inline-block p-2 rotate-90 cursor-pointer">
											<i className="fa-solid fa-right-left" />
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{/* Row */}
								{chapters.map((chapter, i) => (
									<tr
										key={`${i}__${chapter.novel.slug}-chapter-${chapter.slug}`}
										className="overflow-hidden relative group bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
									>
										{/*  */}
										<td
											scope="row"
											colSpan="4"
											className="bg-primary-50 text-white hidden group-hover:table-cell group-hover:animate-pulse"
										>
											<div className="flex items-center justify-evenly gap-2 w-full h-full">
												<Link
													href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
												>
													<a className="inline-block w-full py-4 px-6 hover:bg-primary-300">
														Edit
													</a>
												</Link>

												<Link
													href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
												>
													<a className="inline-block w-full py-4 px-6 hover:bg-primary-300">
														Delete
													</a>
												</Link>
											</div>
										</td>
										{/*  */}

										<th
											scope="row"
											className="table-cell group-hover:hidden font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											<Link
												href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
											>
												<a className="inline-block w-full h-full py-4 px-6">
													الفصل {chapter.slug}
												</a>
											</Link>
										</th>

										<td className="group-hover:hidden hidden md:table-cell ">
											<Link
												href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
											>
												<a className="inline-block w-full h-full py-4 px-6">
													{chapter.title}
												</a>
											</Link>
										</td>
										<td className="group-hover:hidden">
											<Link
												href={`/novels/${chapter.novel.slug}/`}
											>
												<a
													dir="auto"
													className="inline-block w-full h-full py-4 px-6"
												>
													{chapter.novel.title}
												</a>
											</Link>
										</td>
										<td className="group-hover:hidden">
											<Link
												href={`/novels/${chapter.novel.slug}/${chapter.slug}`}
											>
												<a className="flex gap-4 w-full h-full py-4 px-6">
													<span className="">
														{chapter.createdAt
															.split("T")[1]
															.split(":")
															.slice(0, 2)
															.join(":")}
													</span>
													<span className="">
														{
															chapter.createdAt.split(
																"T"
															)[0]
														}
													</span>
												</a>
											</Link>
										</td>
									</tr>
								))}
								{/*  */}
							</tbody>
						</table>
					</div>
				) : (
					<div className="text-center py-6">
						<h2 className="text-2xl text-gray-300 font-semibold">
							لا يوجد فصول حاليا
						</h2>
					</div>
				)}
			</div>
		</Container>
	);
};

export default UserChaptersPage;

//
export const getServerSideProps = async ({ req }) => {
	return requireAuthorAuth({ req }, async ({ user }) => {
		const { data } = await axios.get(
			`${process.env.API_URL}/auth/${user.username}/chapters`,
			{
				headers: {
					token: user.token,
				},
			}
		);

		if (data.ok) {
			return {
				props: { chapters: data.chapters ?? [] },
			};
		}
	});
};
