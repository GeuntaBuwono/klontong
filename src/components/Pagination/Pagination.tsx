import classNames from 'classnames';

type PaginationProps = {
	activePage: number;
	isHasNextPage: boolean;
	onClickPrev: () => void;
	onClickNext: () => void;
};

export const Pagination = ({
	activePage,
	isHasNextPage,
	onClickPrev,
	onClickNext,
}: PaginationProps) => {
	const pageItemClassName = classNames('page-item active');

	return (
		<div className="flex justify-center">
			<nav aria-label="Page navigation example">
				<ul className="flex list-style-none">
					{activePage > 1 && (
						<>
							<li className="page-item">
								<button
									onClick={onClickPrev}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									Prev
								</button>
							</li>
							<li className={pageItemClassName}>
								<button
									onClick={onClickPrev}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									{activePage - 1}
								</button>
							</li>
						</>
					)}
					<li className={pageItemClassName}>
						<button className="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md">
							{activePage} <span className="visually-hidden"></span>
						</button>
					</li>
					{isHasNextPage && (
						<>
							<li className={pageItemClassName}>
								<button
									onClick={onClickNext}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									{activePage + 1}
								</button>
							</li>
							<li className="page-item">
								<button
									onClick={onClickNext}
									className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
								>
									Next
								</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};
