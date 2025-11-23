const ProductCard= ({image,title})=>{
  return (
    <div className="card">
      <img src={image} />
      <p>{title}</p>

    </div>
  )
}
export default ProductCard
