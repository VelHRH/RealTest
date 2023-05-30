package com.example.realtest

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
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

    inner class TestViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val testNameTextView: TextView = itemView.findViewById(R.id.testNameTextView)

        fun bind(test: Test) {
            testNameTextView.text = test.name
        }
    }
}