import React, { useEffect, useState } from "react";
import ChartBox from "./ChartBox";
import { getTopFavorites, getFavoriteCount } from "@/lib/api";
import type { Show } from "@/lib/types/Show";

const ChartTopFavorites: React.FC<{ title?: string; limit?: number }> = ({
    title = "Top phim được yêu thích",
    limit = 10,
}) => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const rsp = await getTopFavorites(0, limit);
                const items = rsp.data || [];

                // fetch favorite counts in parallel for each show (fallbacks handled below)
                const counts = await Promise.all(
                    items.map(async (s) => {
                        try {
                            // assume show has id field
                            const id = (s as any).id;
                            if (!id) return undefined;
                            return await getFavoriteCount(id);
                        } catch {
                            return undefined;
                        }
                    })
                );

                const merged = items.map((s, i) => {
                    const anyS = s as any;
                    const fav = typeof counts[i] === "number" ? counts[i] : anyS.favoriteCount;
                    return { ...s, favoriteCount: fav };
                });

                setShows(merged);
            } catch (e) {
                console.error("getTopFavorites error", e);
            }
        };
        load();
    }, [limit]);

    const categories = shows.map((s) => s.title || "Unknown");

    // Use favoriteCount if backend provides it, otherwise fallback to favorites array length or ranking score
    const data = shows.map((s, i) => {
        const anyS = s as any;
        const maybeCount =
            typeof anyS.favoriteCount === "number"
                ? anyS.favoriteCount
                : Array.isArray(anyS.favorites)
                    ? anyS.favorites.length
                    : undefined;
        return typeof maybeCount === "number" ? maybeCount : shows.length - i;
    });

    const options = {
        chart: { toolbar: { show: false } },
        plotOptions: { bar: { horizontal: true, barHeight: "56%" } },
        dataLabels: { enabled: false },
        xaxis: {
            // categories on xaxis for horizontal bar will render titles on the Y axis
            categories,
            labels: { style: { fontSize: "12px" } },
        },
        yaxis: { labels: { style: { fontSize: "12px" } } },
        colors: ["#a78bfa"],
        grid: { borderColor: "#eef2f6" },
        tooltip: {
            enabled: true,
            // custom tooltip to show full movie info (title, year, age rating, type/status, favorites)
            custom: ({ series, seriesIndex, dataPointIndex }: any) => {
                const s: Show | undefined = shows[dataPointIndex];
                if (!s) return "";
                const anyS = s as any;
                const fav = typeof anyS.favoriteCount === "number" ? anyS.favoriteCount : series[seriesIndex][dataPointIndex];
                const year = s.releaseDate ? new Date(s.releaseDate).getFullYear() : "";
                const typeLabel = s.isSeries ? "Phim bộ" : "Phim lẻ";
                const statusLabel = s.onGoing ? "Đang chiếu" : "Hoàn thành";
                const id = anyS.id ?? "";
                return `
          <div style="padding:10px; font-family:Inter, sans-serif; min-width:220px">
            <div style="font-weight:600; margin-bottom:4px; color:#111">${s.title}</div>
            ${id ? `<div style="font-size:12px; color:#777; margin-bottom:6px">ID: ${id}</div>` : ""}
            <div style="font-size:12px; color:#555; margin-bottom:8px">
              ${typeLabel} · ${statusLabel} ${s.ageRating ? `· ${s.ageRating}` : ""} ${year ? `· ${year}` : ""}
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-size:13px; color:#222">
              <span style="width:10px;height:10px;background:#a78bfa;border-radius:50%;display:inline-block"></span>
              Favorites: <strong style="margin-left:6px">${fav}</strong>
            </div>
          </div>
        `;
            },
        },
    };

    const series = [{ name: "Favorites", data }];

    return <ChartBox title={title} options={options} series={series} type="bar" height={360} />;
};

export default ChartTopFavorites;