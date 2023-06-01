package com.example.realtest

import android.content.Intent
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView

class TestAdapter : RecyclerView.Adapter<TestAdapter.TestViewHolder>() {
    private val testList: MutableList<Test> = mutableListOf()

    fun setTests(tests: List<Test>) {
        testList.clear()
        testList.addAll(tests)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TestViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_test, parent, false)
        return TestViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: TestViewHolder, position: Int) {
        val test = testList[position]
        holder.bind(test)
    }

    override fun getItemCount(): Int {
        return testList.size
    }

    inner class TestViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
        private val testNameTextView: TextView = itemView.findViewById(R.id.testNameTextView)
        private val testCreatorTextView: TextView = itemView.findViewById(R.id.testCreatorTextView)

        init {
            itemView.setOnClickListener(this)
        }

        fun bind(test: Test) {
            testNameTextView.text = test.name
            testCreatorTextView.text = test.testCreator

            val backgroundColor = if (test.isExecuted) {
                Color.RED
            } else {
                Color.GREEN
            }
            itemView.setBackgroundColor(backgroundColor)
        }

        override fun onClick(view: View) {
            val position = adapterPosition
            if (position != RecyclerView.NO_POSITION) {
                val test = testList[position]
                val intent = Intent(view.context, TestDetailsActivity::class.java)
                intent.putExtra("testId", test._id)
                view.context.startActivity(intent)
            }
        }
    }
}