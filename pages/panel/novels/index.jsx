import { requireAuthorAuth } from "../../../utils/middlewares";
import Container from "../../../components/Container";
import NovelCard from "../../../components/NovelCard";
import axios from "axios";

const authorNovelsPage = ({ novels }) => {
	return (
		<Container>
			<div className="">
				<h1 className="mb-6 text-2xl font-semibold">روايات أضفتها :</h1>
				<div className="">
					{!novels.length ? (
						<h1
							dir="ltr"
							className="text-center text-2xl font-semibold"
						>
							No novels yet!
						</h1>
					) : (
						<div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
							{novels.map((novel) => (
								<NovelCard key={novel.slug} novel={novel} />
							))}
						</div>
					)}
				</div>
			</div>
		</Container>
	);
};

export default authorNovelsPage;

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
			props: { novels },
		};
	});
};
