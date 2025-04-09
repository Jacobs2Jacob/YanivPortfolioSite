import styles from './ErrorFallback.module.css';

const ErrorFallback = () => {
    
	return <>
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
		<div className={styles.errorPage}>
			<div className={styles.outer}>
				<div className={styles.middle}>
					<div className={styles.inner}>
						<div className={styles.innerCircle}>
							<i className="fa fa-cogs">
							</i><span>500</span>
						</div>
						<span className={styles.innerStatus}>Something went wrong...</span>
						<span className={styles.innerDetail}>Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.</span>
					</div>
				</div>
			</div>
		</div>
	</>
};

export default ErrorFallback;