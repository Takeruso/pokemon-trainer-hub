import React, { useState, useMemo, useEffect } from 'react';
import newsData from '../assets/news.json';

interface NewsItem {
  title: string;
  content: string;
  date: string;
  category: string;
}

function News() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    setNewsList(newsData as NewsItem[]);
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = newsList.map((news) => news.category);
    return [...new Set(categories)];
  }, [newsList]);

  const filteredNews = useMemo(() => {
    return newsList.filter((news) => {
      const matchTitle = news.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchContent = news.content
        .toLowerCase()
        .includes(searchContent.toLowerCase());
      const matchDate = searchDate === '' || news.date === searchDate;
      const matchCategory =
        selectedCategory === '' || news.category === selectedCategory;

      return matchTitle && matchContent && matchDate && matchCategory;
    });
  }, [newsList, searchTitle, searchContent, searchDate, selectedCategory]);

  const totalPages = Math.ceil(filteredNews.length / perPage);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredNews.slice(start, start + perPage);
  }, [filteredNews, currentPage, perPage]);

  const uniqueDates = useMemo(() => {
    const dates = newsList.map((news) => news.date);
    return [...new Set(dates)];
  }, [newsList]);


  const resetFilters = () => {
    setSearchTitle('');
    setSearchContent('');
    setSearchDate('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          <h1>Pokémon News</h1>
          <p className="text-muted">
            Sample news feed rendered from a local JSON file.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="filters">
            <input
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search by title..."
            />
            <input
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              placeholder="Search by content..."
            />
            <select
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            >
              <option value="">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {(searchTitle ||
              searchContent ||
              searchDate ||
              selectedCategory) && (
              <button className="reset-button" onClick={resetFilters}>
                Clear Search
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {paginatedNews.map((news) => (
            <div
              key={news.title}
              className={`pokemon-card border-${news.category.toLowerCase()}`}
            >
              <div className="card-header">
                <h3>{news.title}</h3>
                <span className="date">{news.date}</span>
              </div>
              <p>
                <strong>Category:</strong> {news.category}
              </p>
              <p>{news.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="pagination-container">
            <button
              className="pagination"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Prev
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="pagination"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
