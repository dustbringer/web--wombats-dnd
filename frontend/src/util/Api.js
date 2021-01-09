export default class Api {
    static makeRequest(url, options) {
        return fetch(url, options)
            .then((res) =>
                res.json().then((json) => ({ status: res.status, json }))
            )
            .then((res) => {
                if (res.status !== 200) {
                    throw Error(res.json.error);
                }
                return res.json;
            });
    }

    static getAll() {
        return this.makeRequest("/api/calender/all");
    }

    static getYear(year) {
        return this.makeRequest(`/api/calender/year?y=${year}`);
    }

    static getMonth(month, year) {
        return this.makeRequest(`/api/calender/month?m=${month}&y=${year}`);
    }

    static getDay(day, month, year) {
        return this.makeRequest(
            `/api/calender/day?d=${day}&m=${month}&y=${year}`
        );
    }

    static addEvent(token, day, month, year, title, description, priority) {
        return this.makeRequest("/api/calender", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({
                day,
                month,
                year,
                title,
                description,
                priority,
            }),
        });
    }

    static editEvent(token, id, day, month, year, title, description, priority) {
        return this.makeRequest("/api/calender", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({
                id,
                day,
                month,
                year,
                title,
                description,
                priority,
            }),
        });
    }

    static removeEvent(token, id) {
        return this.makeRequest("/api/calender", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({ id }),
        });
    }
}
