import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth";

export type Env = {
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
};

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
	const session = await auth.api.getSession({ 
		headers: c.req.raw.headers 
	});

	if (session) {
		c.set("user", session.user);
		c.set("session", session.session);
	} else {
		c.set("user", null);
		c.set("session", null);
	}
	
	await next();
});