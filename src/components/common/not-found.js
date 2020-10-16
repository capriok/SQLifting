import React from 'react'

import styles from '../../styles/common/not-found.module.scss'
import lost from '../../assets/lost.png'

const notFound = () => {
	return (
		<div className={styles.not_found}>
			<h1>Page not found</h1>
			<p>Seems as if you are as lost as Joe Biden...</p>
			<img src={lost} alt="" draggable={false} />
		</div>
	)
}

export default notFound
