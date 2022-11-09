import { requireAuthorAuth } from "../../../utils/middlewares";
import useLoadingPopup from "../../../hooks/useLoadingPopup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import axios from "axios";

import Container from "../../../components/Container";

const newChapter = ({ novels, user }) => {
	const { RenderLoadingPopup, openLoadingPopup, closeLoadingPopup } =
		useLoadingPopup();
	const router = useRouter();

	const schema = yup.object().shape({
		novel: yup.string().required(),
		title: yup.string().required(),
		published: yup.boolean(),
		slug: yup
			.number()
			.typeError("slug must be a valid number")
			.test("positive", "slug must be >= 0", (value) => value >= 0)
			.required(),
		content: yup.string().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const createNewChapter = async (data) => {
		try {
			openLoadingPopup();
			const res = { ok: true }; // await axios.post(
			// 	`${process.env.API_URL}/novels/${data.novel}/create`,
			// 	data,
			// 	{
			// 		headers: {
			// 			token: user.token,
			// 		},
			// 	}
			// );

			if (res.ok) {
				setTimeout(() => {
					closeLoadingPopup();
					router.push("/panel/chapters");
				}, 700);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className="h-full">
			<RenderLoadingPopup />
			<div className="h-full w-full flex justify-center items-center flex-col">
				<form
					onSubmit={handleSubmit(createNewChapter)}
					dir="ltr"
					className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mx-3 sm:w-4/5 sm:mx-8 md:w-[65vw] md:max-w-[30rem]"
				>
					<h2 className="mb-3 text-xl text-gray-700 font-bold text-center">
						Create new chapter!
					</h2>
					{/* Fields */}
					<div className="w-full">
						{/* Novel */}
						<div className="w-full">
							<select
								className="input cursor-pointer"
								{...register("novel")}
							>
								<option value="">select novel</option>
								{novels.length > 0 &&
									novels.map((novel) => (
										<option
											key={novel?.slug}
											value={novel?.slug}
										>
											{novel?.title}
										</option>
									))}
							</select>
							<div className="my-2">
								<div className="text-red-500 text-sm">
									{errors.novel?.message}
								</div>
							</div>
						</div>
						{/* Title */}
						<div className="w-full">
							<input
								dir="auto"
								className="input mt-2"
								type="text"
								placeholder="chapter title..."
								{...register("title")}
							/>
							<div className="my-2">
								<div className="text-red-500 text-sm">
									{errors.title?.message}
								</div>
							</div>
						</div>
						{/* Slug And Published */}
						<div className="w-full flex gap-4 justify-between items-center">
							{/* Slug */}
							<div className="w-2/3">
								<input
									dir="auto"
									className="input mt-2"
									type="text"
									placeholder="chapter slug..."
									{...register("slug")}
								/>
								<div className="my-2">
									<div className="text-red-500 text-sm">
										{errors.slug?.message}
									</div>
								</div>
							</div>
							{/* Published */}
							<div className="w-1/3">
								<label className="" htmlFor="published">
									publishe now
									<input
										className="ml-2"
										type="checkbox"
										id="published"
									/>
								</label>
							</div>
						</div>
						{/* Content */}
						<div className="w-full">
							<textarea
								dir="auto"
								rows={4}
								className="input mt-2 min-h-[2.5rem]"
								type="text"
								placeholder="chapter content..."
								{...register("content")}
							/>
							<div className="my-2">
								<div className="text-red-500 text-sm">
									{errors.content?.message}
								</div>
							</div>
						</div>
						{/*  */}
					</div>

					<button className="btn btn-purple mt-3">Create</button>
				</form>
			</div>
		</Container>
	);
};

export default newChapter;

export const getServerSideProps = async ({ req }) => {
	return requireAuthorAuth({ req }, async ({ user }) => {
		const resp = await axios.get(
			process.env.API_URL + "/auth/" + user?.username,
			{
				headers: {
					token: user?.token,
				},
			}
		);

		const novels = resp?.data?.user?.novels ?? [];
		// console.log(resp.data);
		return {
			props: { novels, user },
		};
	});
};
