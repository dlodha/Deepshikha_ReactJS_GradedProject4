import React from 'react';

type Props={
    favItems:string[],
    onRemove:(arg:string) => void
  }
export default function Favorite(props:Props) {
  const { favItems, onRemove } = props;
   
  return (
    <aside className="block">
      <h2>Favorite Movies</h2>
      <div>
        {favItems.length === 0 && <div>Favorite list is empty</div>}
        {favItems.map((item:string) => (
          <div className="row" key={item}>
            <div >{item}</div>
            <div >
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>
             
            </div>
            </div>
          ))}
       </div>
    </aside>
  );
}