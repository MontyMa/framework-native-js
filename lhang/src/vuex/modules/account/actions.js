export const account = ({commit},uuid) => {
	lh_http("post", "customerAsset/cnyAccount", {
		'useruuid': uuid
	}).done((res) => {
		if(res) {
			commit('account',res.data.account)
		}
	})
};
